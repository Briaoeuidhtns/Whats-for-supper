import AddRecipe from 'features/recipes/AddRecipe'
import AppBar from 'features/config/AppBar'
import { Container } from '@material-ui/core'
import React from 'react'
import Reactions from 'features/recipes/Reactions'
import RecipeForm from 'features/recipes/RecipeForm'
import RecipeStack from 'features/recipes/RecipeStack'

const App: React.FC = () => (
  <>
    <AppBar />
    <Container maxWidth="xs">
      <RecipeStack />
      <Reactions />
      <AddRecipe />
      <RecipeForm />
    </Container>
  </>
)

export default App
