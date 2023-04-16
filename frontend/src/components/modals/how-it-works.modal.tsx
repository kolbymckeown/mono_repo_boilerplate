import {
  Button,
  Code,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
} from '@chakra-ui/react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How The Script Works</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderedList>
            <ListItem>
              Run <Code>sh /path/to/create_mono_repo.sh</Code>
            </ListItem>
            <ListItem>
              Enter variables when prompted
              <Text fontStyle="italic">
                {' '}
                You should have a PostgreSQL with connection details ready as
                well as a Firebase project with a web app
              </Text>
            </ListItem>
            <ListItem>
              The script will create a mono repo with a <Code>backend</Code> and{' '}
              <Code>frontend</Code> folder
            </ListItem>
            <ListItem>
              The <Code>backend</Code> folder will contain a Go module with a
              PostgreSQL database
            </ListItem>
            <ListItem>
              The <Code>frontend</Code> folder will contain a Next.js app with
              Chakra UI and Firebase Auth
            </ListItem>
          </OrderedList>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accent" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
