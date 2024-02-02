import React from 'react'
import styled from '@emotion/styled'
import { Button, Divider, Typography } from '@mui/material'

import type { TodoList } from '~/sample/TodoApp-99/App'

const StyledList = styled.ul`
	margin-top: 32px;
	padding: 0;
	list-style: none;
`

const StyledListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
	margin-bottom: 8px;
`

const StyledButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 134px;
`

type Props = {
	getData: () => Promise<void>
	todoList: TodoList[]
}

export const List: React.FC<Props> = ({ getData, todoList }) => {
	const completedTodoItem = async (item: TodoList) => {
		const res = await fetch(`http://localhost:3000/tasks/${item.id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...item,
				isCompleted: !item.isCompleted,
			}),
		})

		if (!res.ok) {
			throw new Error()
		}

		await getData()
	}

	const deleteTodoItem = async (id: string) => {
		const res = await fetch(`http://localhost:3000/tasks/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			throw new Error()
		}

		await getData()
	}

	return (
		<StyledList>
			{todoList.map((item) => (
				<>
					test
					<StyledListItem key={item.id}>
						<Typography
							sx={{
								textDecoration: () => (item.isCompleted ? 'line-through' : 'none'),
							}}
						>
							{item.content}
						</Typography>
						<StyledButtonWrapper>
							<Button
								type="button"
								onClick={() => deleteTodoItem(item.id)}
								variant="contained"
								size="small"
								sx={{
									minWidth: '57px',
									height: '32px',
									backgroundColor: '#FF3700',
									boxShadow: 'none',
									'&:hover': {
										backgroundColor: '#FF3700',
										boxShadow: 'none',
									},
								}}
							>
								削除
							</Button>
							<Button
								type="button"
								onClick={() => completedTodoItem(item)}
								variant="contained"
								size="small"
								sx={{
									minWidth: '57px',
									height: '32px',
									backgroundColor: `${item.isCompleted ? '#C1C1C1' : '#008CFF'}`,
									boxShadow: 'none',
									'&:hover': {
										backgroundColor: `${item.isCompleted ? '#C1C1C1' : '#008CFF'}`,
										boxShadow: 'none',
									},
								}}
							>
								完了
							</Button>
						</StyledButtonWrapper>
					</StyledListItem>
					<Divider component="li" />
				</>
			))}
		</StyledList>
	)
}
