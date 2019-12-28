import recipeReducer, {
  Recipe,
  addRecipe,
  removeRecipe,
  makeRecipe,
} from './recipeDataSlice'

import uiReducer, {
  availabilityStateMap,
  toggleDescription,
  prevRecipe,
  nextRecipe,
} from './uiSlice'

const dummyRecipe: Recipe = {
    title: 'Dummy Recipe',
    description: 'Dummy Recipe Description',
    rating: 3,
  },
  dummyRecipe2: Recipe = {
    title: 'Dummy Recipe 2',
    description: 'Dummy Recipe 2 Description',
  },
  dummyRecipe3: Recipe = {
    title: 'Dummy Recipe 3',
    description: 'Dummy Recipe 3 Description',
    rating: 5,
  }

describe('recipe reducer', () => {
  it('should handle prevRecipe', () => {
    expect(
      uiReducer(
        {
          index: 1,
          showDescription: false,
        },
        { type: prevRecipe.type }
      )
    ).toEqual({
      index: 0,
      showDescription: false,
    })
  })

  it('should handle nextRecipe', () => {
    expect(
      uiReducer(
        {
          index: 0,
          showDescription: false,
        },
        { type: nextRecipe.type }
      )
    ).toEqual({
      index: 1,
      showDescription: false,
    })
  })

  it('should handle addRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [],
        },
        { type: addRecipe.type, payload: dummyRecipe }
      )
    ).toEqual({
      recipes: [dummyRecipe],
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe],
        },
        { type: addRecipe.type, payload: dummyRecipe2 }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe2],
    })
  })

  it('should handle removeRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe],
        },
        { type: removeRecipe.type, payload: 0 }
      )
    ).toEqual({
      recipes: [],
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
        },
        { type: removeRecipe.type, payload: 1 }
      )
    ).toEqual({
      recipes: [dummyRecipe],
    })
  })

  it('should handle makeRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
        },
        { type: makeRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe2, dummyRecipe],
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
        },
        { type: makeRecipe.type, payload: 1 }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe2],
    })
  })

  expect(
    recipeReducer(
      {
        recipes: [dummyRecipe, dummyRecipe2, dummyRecipe3],
      },
      { type: makeRecipe.type, payload: 1 }
    )
  ).toEqual({
    recipes: [dummyRecipe, dummyRecipe3, dummyRecipe2],
  })

  expect(
    uiReducer({ index: 1, showDescription: false }, { type: makeRecipe.type })
  ).toEqual({
    index: 0,
    showDescription: false,
  })

  it('should show the description on toggle', () => {
    expect(
      uiReducer(
        {
          index: 0,
          showDescription: false,
        },
        { type: toggleDescription.type }
      )
    ).toEqual({
      index: 0,
      showDescription: true,
    })
  })
})

describe('avaliability state map', () => {
  it('describes recipe availability', () => {
    expect(
      availabilityStateMap({
        recipes: { recipes: [] },
        recipeUi: { index: 0, showDescription: false },
      })
    ).toEqual({
      hasPrev: false,
      has: false,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe] },
        recipeUi: { index: 0, showDescription: false },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe, dummyRecipe] },
        recipeUi: { index: 0, showDescription: false },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: true,
    })

    expect(
      availabilityStateMap({
        recipes: { recipes: [dummyRecipe, dummyRecipe] },
        recipeUi: { index: 1, showDescription: false },
      })
    ).toEqual({
      hasPrev: true,
      has: true,
      hasNext: false,
    })
  })
})
