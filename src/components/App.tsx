import React from 'react'

import { Container } from '@material-ui/core'

import AddRecipe from '../features/recipes/AddRecipe'
import RecipeStack from '../features/recipes/RecipeStack'
import Reactions from '../features/recipes/Reactions'

const App: React.FC = () => (
  <Container maxWidth="xs">
    <RecipeStack />
    <Reactions />
    <AddRecipe />
  </Container>
)

export default App
