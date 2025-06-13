import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { CoffeeService } from './coffeeService';
import { Coffee } from '../types/coffee';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const mockCoffees: Coffee[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    roaster: 'Blue Bottle',
    country: 'Ethiopia',
    roastLevel: 'Light',
    flavorNotes: ['floral', 'citrus'],
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    roaster: 'Stumptown',
    country: 'Colombia',
    roastLevel: 'Medium',
    flavorNotes: ['chocolate', 'nutty'],
  },
];

const server = setupServer(
  http.get('http://localhost/api/coffees', () => {
    return HttpResponse.json(mockCoffees);
  }),
  http.get('http://localhost/api/coffees/:id', ({ params }) => {
    const coffee = mockCoffees.find((c) => c.id === params.id);
    if (coffee) return HttpResponse.json(coffee);
    return new HttpResponse('Not found', { status: 404 });
  }),
  http.post('http://localhost/api/coffees', async ({ request }) => {
    let body = await request.json();
    if (typeof body !== 'object' || body === null) body = {};
    const newCoffee = { ...body, id: '3' };
    return HttpResponse.json(newCoffee, { status: 201 });
  }),
  http.post('http://localhost/api/coffees/:id', async ({ request, params }) => {
    let body = await request.json();
    if (typeof body !== 'object' || body === null) body = {};
    const updated = { ...body, id: params.id };
    return HttpResponse.json(updated);
  }),
  http.post('http://localhost/api/coffees/:id/delete', () => {
    return new HttpResponse(null, { status: 204 });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('CoffeeService integration', () => {
  it('fetches all coffees', async () => {
    const coffees = await CoffeeService.getCoffees();
    expect(coffees).toHaveLength(2);
    expect(coffees[0].name).toBe('Ethiopian Yirgacheffe');
  });

  it('fetches a coffee by ID', async () => {
    const coffee = await CoffeeService.getCoffeeById('1');
    expect(coffee).toBeDefined();
    expect(coffee.id).toBe('1');
  });

  it('returns error for missing coffee', async () => {
    await expect(CoffeeService.getCoffeeById('999')).rejects.toThrow('API error: 404');
  });

  it('creates a new coffee', async () => {
    const newCoffee = await CoffeeService.createCoffee({
      name: 'Kenya AA',
      roaster: 'Intelligentsia',
      country: 'Kenya',
      roastLevel: 'Dark',
      flavorNotes: ['berry', 'winey'],
    });
    expect(newCoffee.id).toBe('3');
    expect(newCoffee.name).toBe('Kenya AA');
  });

  it('updates a coffee', async () => {
    const updated = await CoffeeService.updateCoffee('1', { name: 'Updated Name' });
    expect(updated.id).toBe('1');
    expect(updated.name).toBe('Updated Name');
  });

  it('deletes a coffee', async () => {
    await expect(CoffeeService.deleteCoffee('1')).resolves.toBeUndefined();
  });

  it('retries on network error', async () => {
    let callCount = 0;
    server.use(
      http.get('http://localhost/api/coffees', () => {
        callCount++;
        if (callCount < 2) return new HttpResponse(null, { status: 503 });
        return HttpResponse.json(mockCoffees);
      })
    );
    const coffees = await CoffeeService.getCoffees();
    expect(coffees).toHaveLength(2);
    expect(callCount).toBe(2);
  });
}); 