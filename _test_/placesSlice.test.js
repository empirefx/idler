import { describe, it, expect } from 'vitest';
import placesReducer, {
  navigateToPlace,
  selectCurrentPlace,
  selectAvailableConnections,
  selectBackgroundImage,
  selectCurrentPlaceBuildings
} from '../src/store/slices/placesSlice';
import placesData from '../src/data/places.json';

describe('placesSlice reducer and selectors', () => {
  const initialState = placesReducer(undefined, { type: '' });

  it('should have initial currentPlaceId and state', () => {
    expect(initialState.currentPlaceId).toBe('village_center');
  });

  it('should handle navigateToPlace and update availableConnections', () => {
    const targetId = 'forest_edge';
    const newState = placesReducer(initialState, navigateToPlace(targetId));
    expect(newState.currentPlaceId).toBe(targetId);
    expect(newState[targetId].visited).toBe(true);
    const expectedConnections = placesData.places[targetId].connections.length;
    expect(newState.availableConnections.length).toBe(expectedConnections);
  });

  it('selectCurrentPlace returns correct place object', () => {
    const selected = selectCurrentPlace({ places: initialState });
    expect(selected).toEqual(initialState[initialState.currentPlaceId]);
  });

  it('selectBackgroundImage returns the right image', () => {
    const bg = selectBackgroundImage({ places: initialState });
    expect(bg).toBe(placesData.places.village_center['background-image']);
  });

  it('selectCurrentPlaceBuildings returns buildings array', () => {
    const buildings = selectCurrentPlaceBuildings({ places: initialState });
    expect(buildings).toEqual(placesData.places.village_center.buildings);
  });
});
