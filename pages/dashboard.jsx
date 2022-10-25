import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Button, chakra, Container, Flex, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Td, Text, Tr, useDisclosure } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import { useForm } from 'react-hook-form'

const Dashboard = () => {
	const queryClient = useQueryClient()
	const { data, isFetched } = useQuery(['students'], () => api.all('/students'))
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
	const [update, setUpdate] = useState()

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm()

	const addStudentsMutation = useMutation((data) => api.create('/students', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('students')
			onClose()
		}
	})

	const updateStudentMutation = useMutation((data) => api.update('/students', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('students')
			onUpdateClose()
		}
	})

	const deleteStudentMutation = useMutation((data) => api.remove('/students', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('students')
			onClose()
		}
	})

	const onSubmit = (data) => {
		addStudentsMutation.mutate(data)
	}

	const onUpdate = (data) => {
		updateStudentMutation.mutate({
			id: update._id,
			data: data
		})
	}

	const onDelete = (id) => {
		deleteStudentMutation.mutate(id)
	}

	return (
		<>
			<Container>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="xl" fontWeight="semibold" color="accent-1">
							Dashboard
						</Text>

						<Button colorScheme="brand" onClick={onOpen}>
							Add New
						</Button>
					</Flex>

					<SimpleGrid columns={4} gap={6}>
						<Card>
							<Flex direction="column" gap={3}>
								<Text>Total Students</Text>

								<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
									{isFetched && data.length}
								</Text>
							</Flex>
						</Card>
					</SimpleGrid>

					<Card>
						<Table
							data={isFetched && data}
							th={['Student ID', 'First Name', 'Last Name', 'Section', 'Gender', '']}
							td={(user) => (
								<Tr key={user._id}>
									<Td>{user._id}</Td>
									<Td>{user.first_name}</Td>
									<Td>{user.last_name}</Td>
									<Td>{user.section}</Td>
									<Td>{user.gender}</Td>
									<Td textAlign="right">
										<Menu>
											<MenuButton as={IconButton} size="xs" icon={<FiMoreHorizontal size={14} />} />

											<MenuList>
												<MenuItem onClick={() => reset() || setUpdate(user) || onUpdateOpen()}>Update</MenuItem>
												<MenuItem onClick={() => onDelete(user._id)}>Delete</MenuItem>
											</MenuList>
										</Menu>
									</Td>
								</Tr>
							)}
							select={(register, state, dispatch) => (
								<Flex flex={1} justify="end">
									<Select placeholder="Gender" variant="filled" size="lg" w="auto" {...register('g', { onChange: () => dispatch({ ...state, isLoading: true }) })}>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</Select>
								</Flex>
							)}
							filters={(data, watch) => {
								return data.filter((data) => ['first_name', 'last_name'].some((key) => data[key].toString().toLowerCase().includes(watch('search').toLowerCase()))).filter((data) => (watch('g') ? data.gender.toLowerCase() === watch('g') : data))
							}}
							effects={(watch) => {
								return [watch('g')]
							}}
						/>
					</Card>
				</Flex>
			</Container>

			<Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<chakra.form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Add New Students</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl>
									<FormLabel>First Name</FormLabel>
									<Input variant="filled" size="lg" {...register('first_name', { required: true })} />
								</FormControl>

								<FormControl>
									<FormLabel>Last Name</FormLabel>
									<Input variant="filled" size="lg" {...register('last_name', { required: true })} />
								</FormControl>

								<FormControl>
									<FormLabel>Section</FormLabel>

									<Select variant="filled" size="lg" {...register('section', { required: true })}>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel>Gender</FormLabel>

									<Select variant="filled" size="lg" {...register('gender', { required: true })}>
										<option>Male</option>
										<option>Female</option>
									</Select>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" size="lg" colorScheme="brand">
								Submit
							</Button>

							<Button size="lg" onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</chakra.form>
				</ModalContent>
			</Modal>

			<Modal preserveScrollBarGap isOpen={isUpdateOpen} onClose={onUpdateClose}>
				<ModalOverlay />

				<ModalContent>
					<chakra.form onSubmit={handleSubmit(onUpdate)}>
						<ModalHeader>Add New Students</ModalHeader>
						<ModalCloseButton />

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl>
									<FormLabel>First Name</FormLabel>
									<Input variant="filled" size="lg" defaultValue={update && update.first_name} {...register('first_name', { required: true })} />
								</FormControl>

								<FormControl>
									<FormLabel>Last Name</FormLabel>
									<Input variant="filled" size="lg" defaultValue={update && update.last_name} {...register('last_name', { required: true })} />
								</FormControl>

								<FormControl>
									<FormLabel>Section</FormLabel>

									<Select variant="filled" size="lg" defaultValue={update && update.section} {...register('section', { required: true })}>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel>Gender</FormLabel>

									<Select variant="filled" size="lg" defaultValue={update && update.gender} {...register('gender', { required: true })}>
										<option>Male</option>
										<option>Female</option>
									</Select>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" size="lg" colorScheme="brand">
								Submit
							</Button>

							<Button size="lg" onClick={onUpdateClose}>
								Close
							</Button>
						</ModalFooter>
					</chakra.form>
				</ModalContent>
			</Modal>
		</>
	)
}

Dashboard.authentication = {
	authorized: 'Teacher'
}

export default Dashboard
