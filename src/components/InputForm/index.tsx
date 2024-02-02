import React from 'react'
import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'

const StyledForm = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 327px;
	height: 32px;
	margin-top: 32px;
`

type Props = {
	getData: () => Promise<void>
}

export const InputForm: React.FC<Props> = ({ getData }) => {
	const [content, setContent] = React.useState('')

	const addTodoItem = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const randomId = crypto.randomUUID()

		const res = await fetch('http://localhost:3000/tasks', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: randomId,
				content,
				isCompleted: false,
			}),
		})

		console.log('test1')

		setContent('')

		if (!res.ok) {
			throw new Error()
		}

		await getData()
	}

	return (
		<StyledForm onSubmit={(e) => addTodoItem(e)}>
			<TextField
				id="add-todo-item"
				type="text"
				placeholder="タスクを入力"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				variant="outlined"
				size="small"
				sx={{
					width: '250px',
				}}
			/>
			<Button
				type="submit"
				disabled={!content}
				variant="contained"
				size="small"
				sx={{
					minWidth: '57px',
					height: '32px',
					backgroundColor: `${!content ? '#C1C1C1' : '#008CFF'}`,
					boxShadow: 'none',
					'&:hover': {
						backgroundColor: `${!content ? '#C1C1C1' : '#008CFF'}`,
						boxShadow: 'none',
					},
				}}
			>
				追加
			</Button>
		</StyledForm>
	)
}
