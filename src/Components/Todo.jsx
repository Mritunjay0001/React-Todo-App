import { useEffect, useState } from "react";
import {
  Heading,
  Input,
  Button,
  Flex,
  Spacer,
  Container
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { useToast } from "@chakra-ui/react";
const getData = () => {
  let data = JSON.parse(localStorage.getItem("list"));
  console.log(data);
  if (data) {
    return data;
  } else {
    return [];
  }
};

export default function Todo() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(getData());
  const [toggle, setToggle] = useState(false);
  const [itemId, setItemId] = useState("");
  const toast = useToast();

  const AddHandler = () => {
    if (input !== "") {
      const newData = { id: new Date().getTime().toString(), name: input };
      setData([...data, newData]);
      toast({
        title: `Task Add`,
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true
      });
      setInput("");
      // console.log(newData)
      setToggle(false);
    }
  };
  const DeleteHandler = (id, name) => {
    //  console.log(id)
    const updatData = data.filter((ele) => ele.id !== id);

    setData(updatData);
    toast({
      title: `${name} Task Deleted`,
      status: "error",
      position: "top",
      duration: 1000,
      isClosable: true
    });
  };
  const editHandler = (id, name) => {
    setInput(name);
    setToggle(true);
    setItemId(id);
    toast({
      title: `Now You Can Edit ${name} `,
      status: "info",
      position: "top",
      duration: 1000,
      isClosable: true
    });
  };

  const editingHandler = () => {
    const updateData = data.map((ele) => {
      return itemId === ele.id ? { ...ele, name: input } : ele;
    });
    setData(updateData);
    setInput("");
    setToggle(false);
    toast({
      title: `Successfully Task Updated `,
      status: "success",
      position: "top",
      duration: 1000,
      isClosable: true
    });
  };

  const AllDelete = () => {
    setData([]);
    toast({
      title: `All Task Successfully Deleted `,
      status: "error",
      position: "top",
      duration: 1000,
      isClosable: true
    });
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(data));
  }, [data]);
  return (
    <Container>
      <Flex direction={"column"} rowGap={10}>
        <Heading as="h1" size="xl" noOfLines={1}>
          Todo App
        </Heading>
        <Flex>
          <Input
            size="md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task"
          />
          {toggle ? (
            <Button colorScheme="blue" onClick={editingHandler}>
              <EditIcon />
            </Button>
          ) : (
            <Button colorScheme="green" onClick={AddHandler}>
              <AddIcon />
            </Button>
          )}
        </Flex>

        <Flex direction={"column"} rowGap={10}>
          {data.map((el, id) => {
            return (
              <Flex rowGap={10} key={el.id}>
                {" "}
                <Heading size="md">{el.name}</Heading>
                <Spacer />
                <Flex columnGap={4}>
                  <Button
                    colorScheme="blue"
                    onClick={() => editHandler(el.id, el.name)}
                  >
                    <EditIcon />
                  </Button>{" "}
                  <Button
                    colorScheme="red"
                    onClick={() => DeleteHandler(el.id, el.name)}
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Button colorScheme="yellow" n onClick={AllDelete}>
          Delete All
        </Button>
      </Flex>
    </Container>
  );
}
