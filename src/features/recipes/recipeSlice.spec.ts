import recipeReducer, {
  Recipe,
  slice,
  prevRecipe,
  nextRecipe,
  addRecipe,
  removeRecipe,
  makeRecipe,
  availabilityStateMap,
} from './recipeSlice'

const dummyRecipe: Recipe = { title: 'Dummy Recipe' , rating: 3},
  dummyRecipe2: Recipe = { title: 'Dummy Recipe 2', rating: 4 },
  dummyRecipe3: Recipe = { title: 'Dummy Recipe 3', rating: 5 }

describe('recipe reducer', () => {
  it('should handle prevRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe],
          index: 1,
        },
        { type: prevRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe],
      index: 0,
    })
  })

  it('should handle nextRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe],
          index: 0,
        },
        { type: nextRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe],
      index: 1,
    })
  })

  it('should handle addRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [],
          index: 0,
        },
        { type: addRecipe.type, payload: dummyRecipe }
      )
    ).toEqual({
      recipes: [dummyRecipe],
      index: 0,
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe],
          index: 0,
        },
        { type: addRecipe.type, payload: dummyRecipe2 }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe2],
      index: 0,
    })
  })

  it('should handle removeRecipe by deleting current recipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe],
          index: 0,
        },
        { type: removeRecipe.type }
      )
    ).toEqual({
      recipes: [],
      index: 0,
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
          index: 1,
        },
        { type: removeRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe],
      index: 0,
    })
  })

  it('should handle makeRecipe', () => {
    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
          index: 0,
        },
        { type: makeRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe2, dummyRecipe],
      index: 0,
    })

    expect(
      recipeReducer(
        {
          recipes: [dummyRecipe, dummyRecipe2],
          index: 1,
        },
        { type: makeRecipe.type }
      )
    ).toEqual({
      recipes: [dummyRecipe, dummyRecipe2],
      index: 0,
    })
  })

  expect(
    recipeReducer(
      {
        recipes: [dummyRecipe, dummyRecipe2, dummyRecipe3],
        index: 1,
      },
      { type: makeRecipe.type }
    )
  ).toEqual({
    recipes: [dummyRecipe, dummyRecipe3, dummyRecipe2],
    index: 0,
  })
})

describe('avaliability state map', () => {
  it('describes recipe availability', () => {
    expect(
      availabilityStateMap({
        [slice]: { recipes: [], index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: false,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        [slice]: { recipes: [dummyRecipe], index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: false,
    })

    expect(
      availabilityStateMap({
        [slice]: { recipes: [dummyRecipe, dummyRecipe], index: 0 },
      })
    ).toEqual({
      hasPrev: false,
      has: true,
      hasNext: true,
    })

    expect(
      availabilityStateMap({
        [slice]: { recipes: [dummyRecipe, dummyRecipe], index: 1 },
      })
    ).toEqual({
      hasPrev: true,
      has: true,
      hasNext: false,
    })
  })
})
