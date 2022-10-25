import { useState, useEffect } from 'react'
import { Flex, IconButton, Input, InputGroup, InputLeftElement, Select, Skeleton, Table as ChakraTable, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi'
import { useForm } from 'react-hook-form'

const Table = (props) => {
	const { data, th, td, select, filters, effects, settings } = props
	const { register, watch } = useForm()
	const [state, dispatch] = useState({ isLoading: true, min: 0, max: 0, show: 0 })
	const { isLoading, min, max, show } = state
	const results = filters ? data && filters(data, watch) : data
	const xeffects = effects ? effects(watch) : []

	const prev = () => {
		dispatch({ ...state, min: min - show, max: max - show })
	}

	const next = () => {
		dispatch({ ...state, min: min + show, max: max + show })
	}

	useEffect(() => {
		dispatch({ ...state, min: 0, max: Number(watch('show')), show: Number(watch('show')) })
	}, [watch('show')])

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch({ ...state, isLoading: false, min: 0, max: Number(watch('show')) })
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [watch('search'), ...xeffects])

	return (
		<Flex direction="column" gap={6}>
			<Flex display={settings && settings.search && !settings.search.enabled && !select ? 'none' : 'flex'} direction={{ base: 'column', md: 'row' }} gap={6}>
				<InputGroup display={settings && settings.search && !settings.search.enabled && 'none'} w={{ base: 'full', md: 300 }}>
					<InputLeftElement pt={1}>
						<FiSearch size={20} />
					</InputLeftElement>

					<Input placeholder="Search..." variant="filled" size="lg" {...register('search', { onChange: () => dispatch({ ...state, isLoading: true }) })} />
				</InputGroup>

				{select && select(register, state, dispatch)}
			</Flex>

			<TableContainer>
				<ChakraTable>
					<Thead>
						<Tr>{th && th.map((data, index) => <Th key={index}>{data}</Th>)}</Tr>
					</Thead>

					<Tbody>
						{!isLoading && results
							? results.slice(min, max).map((data, index) => td && td(data, index))
							: [...Array(settings && settings.skeleton ? settings.skeleton : 10)].map((data, index) => (
									<Tr key={index}>
										{[...Array(th.length)].map((data, index) => (
											<Td key={index}>
												<Skeleton borderRadius="full" h={2} />
											</Td>
										))}
									</Tr>
							  ))}
					</Tbody>
				</ChakraTable>
			</TableContainer>

			<Flex justify="space-between" align="center" gap={6}>
				<Select variant="filled" size="lg" w="auto" {...register('show')}>
					{settings && settings.select ? (
						settings.select.options.map((data, index) => (
							<option value={data} key={index}>
								{data}
							</option>
						))
					) : (
						<>
							<option>10</option>
							<option>25</option>
							<option>50</option>
						</>
					)}
				</Select>

				<Flex align="center" gap={3}>
					<IconButton variant="filled" size="lg" color="accent-1" icon={<FiChevronLeft size={20} />} disabled={min === 0} onClick={prev} />
					<IconButton variant="filled" size="lg" color="accent-1" icon={<FiChevronRight size={20} />} disabled={isLoading || results.length <= max} onClick={next} />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Table
