import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiChevronDown, FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi'

const Header = ({ onSidebarOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={18} />, <FiSun size={18} />)

	return (
		<chakra.header bg="white" position="sticky" top={0} zIndex={99} _dark={{ bg: 'surface', border: 'none' }}>
			<Flex align="center" gap={6} mx="auto" px={6} h={20} w="full" maxW={1280}>
				<Flex justify="start" align="center">
					<Flex align="center" gap={2}>
						<Image alt="logo" src="/assets/logo.png" boxSize={12} />

						<Text fontSize="lg" fontWeight="semibold" color="accent-1">
							Interactive Multimedia
						</Text>
					</Flex>
				</Flex>

				<Flex flex={1} justify="end" align="center">
					<Flex align="center" gap={6}>
						<Flex display={{ base: 'none', md: 'flex' }} align="center" gap={6}>
							<Link>Home</Link>

							<Menu closeOnSelect={false} placement="bottom-end">
								<MenuButton as={Link}>
									<Flex align="center" gap={2}>
										<Text>About</Text>
										<Icon as={FiChevronDown} size={16} color="currentColor" />
									</Flex>
								</MenuButton>

								<MenuList>
									<MenuItem>Mission</MenuItem>
									<MenuItem>Vision</MenuItem>
								</MenuList>
							</Menu>

							<Link>Contact</Link>
						</Flex>

						{session ? (
							<Menu>
								<MenuButton>
									<Avatar name={session.user.role} src={session.user.image} />
								</MenuButton>

								<MenuList>
									<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
										Log out
									</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<Button colorScheme="brand" onClick={() => signIn('google')}>
								Sign in
							</Button>
						)}
					</Flex>
				</Flex>
			</Flex>
		</chakra.header>
	)
}

export default Header
