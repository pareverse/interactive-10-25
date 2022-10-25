import { Button, chakra, Flex, Image, Text } from '@chakra-ui/react'

const Hero = () => {
	return (
		<chakra.section bgImage="url('/assets/cs.jpg')" bgRepeat="no-repeat" bgSize="cover" position="relative" h="calc(100vh - 80px)">
			<Flex justify="center" position="absolute" px={6} py={12} h="full" w="full">
				<Flex align="center" direction="column">
					<Image alt="logo" src="/assets/logo.png" boxSize={{ base: 60, md: 80 }} />

					<Text fontSize={{ base: 48, md: 60 }} fontWeight="bold" textAlign="center" color="white">
						Queens Row Elementary School
					</Text>

					<Text fontSize={{ base: 'md', md: 'xl' }} textAlign="center" color="white">
						&quot;Children learn as they play. Most importantly, children learn how to learn.&quot;
					</Text>

					<Button size="xl" colorScheme="brand" mt={12}>
						Get Started
					</Button>
				</Flex>
			</Flex>

			<Flex bg="#000000CC" h="full" w="full"></Flex>
		</chakra.section>
	)
}

export default Hero
