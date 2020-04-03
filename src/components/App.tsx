import AddRecipe from '../features/recipes/AddRecipe'
import { Container } from '@material-ui/core'
import React from 'react'
import Reactions from '../features/recipes/Reactions'
import RecipeStack from '../features/recipes/RecipeStack'

const App: React.FC = () => (
  <Container maxWidth="xs">
    <RecipeStack />
    <Reactions />
    <AddRecipe />
  </Container>
)

export default App
