import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiFlashlightFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import useAuth from '@/hooks/use-auth';
import { selectUser } from '@/redux/slices/user.slice';

const navLinks = [
  { name: 'About', path: '#' },
  { name: 'Features', path: '#' },
  { name: 'Pricing', path: '#' },
];

const dropdownLinks = [
  {
    name: 'Blog',
    path: '#',
  },
  {
    name: 'Documentation',
    path: '#',
  },
  {
    name: 'Github Repo',
    path: '#',
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(selectUser);
  const { logout } = useAuth();

  const bgColor = useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)');

  const boxShadowColor = useColorModeValue(
    '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
    '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
  );

  return (
    <Box px={4} bg={useColorModeValue('white', 'black')}>
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <Icon as={RiFlashlightFill} h={8} w={8} />

        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={6}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}

            {/* Dropdown Menu */}
            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton _hover={{ color: 'accent.500' }}>
                    <Flex alignItems="center">
                      <Text>Community</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? 'rotate(180deg)' : ''}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    zIndex={5}
                    bg={bgColor}
                    border="none"
                    boxShadow={boxShadowColor}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink
                        key={index}
                        name={link.name}
                        path={link.path}
                        onClose={onClose}
                      />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </HStack>
        {user.email ? (
          <Button
            bg="accent.500"
            color="white"
            size="md"
            rounded="md"
            display={{ base: 'none', md: 'block' }}
            _hover={{
              bg: 'accent.700',
            }}
            onClick={logout}
          >
            Sign out
          </Button>
        ) : (
          <Flex gap={2}>
            <NextLink href="/session/login">
              <Button
                variant="outline"
                borderColor="accent.500"
                color="accent.500"
                size="md"
                rounded="md"
                display={{ base: 'none', md: 'block' }}
                _hover={{
                  bg: 'accent.200',
                }}
              >
                Login
              </Button>
            </NextLink>
            <NextLink href="/session/sign-up">
              <Button
                bg="accent.500"
                color="white"
                size="md"
                rounded="md"
                display={{ base: 'none', md: 'block' }}
                _hover={{
                  bg: 'accent.700',
                }}
              >
                Sign Up
              </Button>
            </NextLink>
          </Flex>
        )}
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          color={useColorModeValue('black', 'white')}
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            <Text fontWeight="semibold" color="gray.500">
              Community
            </Text>
            <Stack pl={2} spacing={1} mt={'0 !important'}>
              {dropdownLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
            </Stack>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('accent.500', 'accent.700'),
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

// Dropdown MenuLink Component
interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link
      href={path}
      onClick={() => onClose()}
      style={{ textDecoration: 'none' }}
    >
      <MenuItem
        _hover={{
          color: useColorModeValue('accent.500', 'accent.700'),
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
