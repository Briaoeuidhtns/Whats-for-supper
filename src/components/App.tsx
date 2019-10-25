import React from 'react'
import AddRecipe from '../features/recipes/AddRecipe'
import RecipeStack from '../features/recipes/RecipeStack'
import Reactions from '../features/recipes/Reactions'
import Container from '@material-ui/core/Container'

const App: React.FC = () => (
  <Container maxWidth="xs">
    <AddRecipe />
    <RecipeStack />
    <Reactions />
  </Container>
)

export default App
