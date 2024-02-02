import React from 'react'
import styled from '@emotion/styled'
import { Button, Divider, Typography } from '@mui/material'

// TODO: pathが異なる場合があります。適宜修正してください。
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
	setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>
	todoList: TodoList[]
}

export const List: React.FC<Props> = ({ setTodoList, todoList }) => {
	const completedTodoItem = (id: string) => {
		const updateList = todoList.map((data) => {
			if (data.id === id) {
				return {
					...data,
					isCompleted: !data.isCompleted,
				}
			}
			return data
		})
		setTodoList(updateList)
	}

	const deleteTodoItem = (id: string) => {
		const updateList = todoList.filter((data) => data.id !== id)
		setTodoList(updateList)
	}

	return (
		<StyledList>
			{todoList.map((item) => (
				<>
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
								onClick={() => completedTodoItem(item.id)}
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
