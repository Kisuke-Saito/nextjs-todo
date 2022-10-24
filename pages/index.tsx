import { DataGrid, GridColDef, GridExpandMoreIcon, GridToolbarContainer } from "@mui/x-data-grid"
import { NextPage } from "next"
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Card, Grid, Link, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../api"

const Home: NextPage = () => {
  const TodoSearchFormSchema = z.object({
    id: z.string(),
    name: z.string(),
  })
  const { register, handleSubmit, control } = useForm<z.infer<typeof TodoSearchFormSchema>>()
  const onSubmit: SubmitHandler<z.infer<typeof TodoSearchFormSchema>> = (data) => {
    setQuery(data)
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      renderCell: (params) => (
        <Link href={`/${params.value}`}>{params.value}</Link>
      ),
      flex: 1
    },
    { field: 'name', headerName: '名前', flex: 1 },
    { field: 'fixedOn', headerName: '期日', flex: 1 },
  ]
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState<any[]>([])
  useEffect(() => {
    const fetchRows = async () => {
      try {
        // const { data: { todos } } = await api.get('todos', { params: query })
        // setRows(todos)
      } catch (error) {      
      }
      const rows = [
        { id: '1111', name: '洗濯', fixedOn:'10/12' },
        { id: '2222',  name: 'ゴミ出し', fixedOn:'11/22' }
      ]
      setRows(rows)

    }
    fetchRows()
  }, [query])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Card style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
        </Card>
      </Stack>
    </form>
  )
}

export default Home
