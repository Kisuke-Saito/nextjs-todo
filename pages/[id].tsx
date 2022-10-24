import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Grid, Stack, TextField } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../api"
import FixedOn from "../components/FixedOn"

const Home: NextPage = () => {
  const { query: { id } } = useRouter()
  const TodoFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    fixedOn: z.date(),
  })
  const { register, handleSubmit, setValue, control } = useForm<z.infer<typeof TodoFormSchema>>({
    defaultValues: {
      id: '',
      name: '',
      fixedOn: undefined
    },
    resolver: zodResolver(TodoFormSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof TodoFormSchema>> = (data) => {
    setQuery(data)
  }
  const [ query, setQuery ] = useState({})
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const { data: { todo } } = await api.get(`/${id}`)
        if (todo) {
          setValue('id', todo.id)
          setValue('name', 'test')
          setValue('fixedOn', new Date())
        }
        
      } catch (error) {
      }
    }
    fetchRows()
  }, [id])

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={4}>
            <TextField fullWidth label='名前' { ...register('name', { required: true } )} />
          </Grid>
          <Grid item xs={4}>
            <FixedOn fullWidth label='期日'  control={control} { ...register('fixedOn', { required: true } )} />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit">保存</Button>
      </Stack>
    </form>
  )
}

export default Home
