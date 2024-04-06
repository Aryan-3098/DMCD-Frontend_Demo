import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  FormHelperText,
  useToast,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Progress,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/images/DMCD-logos_transparent.png";
import NumberVerification from "../components/NumberVerification";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/userActions";
import { BACKEND_ENDPOINT } from "../constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const userID = localStorage.getItem("userID");

  // const clearOut = (() => {
  //     if (localStorage) {
  //         localStorage.clear();
  //     }
  //     if (sessionStorage) {
  //         sessionStorage.clear();
  //     }
  //     if (Cookies.get('token')) {
  //         Cookies.remove('token');
  //     }
  //     dispatch(clearUser());
  // })();

  // SignIn Start

  const [signinEmail, setSigninEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nullOtp, setNullOtp] = useState(false);

  const handleEmailChange = (event) => setSigninEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleClick = () => setShowPassword(!showPassword);

  const handleSignIn = () => {
    setLoading(true);
    axios
      .post(`${BACKEND_ENDPOINT}signin`, {
        email: signinEmail,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          Cookies.set("token", token, { expires: 5 });
          navigate("/home");
          localStorage.setItem("userID", response.data.responseUser._id);
          dispatch(setUser(response.data.responseUser));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Sign in failed:", error);
        setLoading(false);
      });
  };
  // SignIn ENd

  const handlePhoneNumberChange = (number) => {
    setsignUpFormData({ ...signUpFormData, phone: number });
    setShowForm(true);
  };

  const [showForm, setShowForm] = useState(false);
  // SignUp Start
  const [showPasswordS, setShowPasswordS] = useState(false);
  const handleClickSignUp = () => setShowPasswordS(!showPasswordS);

  const [signUpFormData, setsignUpFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    religion: "",
    dateOfBirth: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setsignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!signUpFormData.name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!signUpFormData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^\S+@\S+$/.test(signUpFormData.email.trim())) {
      formErrors.email = "Invalid email format";
    }
    if (!signUpFormData.password.trim()) {
      formErrors.password = "Password is required";
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          `${BACKEND_ENDPOINT}signup`,
          signUpFormData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast({
            title: "Account created.",
            description: response.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setsignUpFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            city: "",
            religion: "",
            dateOfBirth: "",
            gender: "",
          });
          setTabIndex(0);
          setNullOtp(true);
          setShowForm(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.error || "Error",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        if (
          error.response.data.error.includes(
            "Account with this phone number already exists"
          )
        ) {
          setsignUpFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            city: "",
            religion: "",
            dateOfBirth: "",
            gender: "",
          });
          setNullOtp(true);
          setShowForm(false);
        }
      }
    }
  };

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (userID && userID !== null) {
      navigate("/home");
    }
  }, []);
  
    return (
      <Box className="h-full flex justify-center items-center flex-col bg-primary">
        {loading ? (
          <Progress
            isIndeterminate
            style={{ height: "7px" }}
            className="w-full "
          />
        ) : (
          ""
        )}
        <Box
          className="bg-white p-4 rounded-lg shadow-xl mt-10"
          height={500}
          width={350}
        >
          <Heading className="text-center text-seconday">Welcome</Heading>
          <Text className="my-2 text-center">
            {tabIndex === 0
              ? "Have an account already? Sign In"
              : "New Here? Sign Up"}
          </Text>
          <Box>
            <Tabs isFitted onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab
                  _selected={{
                    fontWeight: "bold",
                    color: "#006E61",
                    borderBottom: "2px solid #006E61",
                  }}
                >
                  Sign In
                </Tab>
                <Tab
                  _selected={{
                    fontWeight: "bold",
                    color: "#006E61",
                    borderBottom: "2px solid #006E61",
                  }}
                >
                  Sign Up
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FormControl>
                    <Input
                      className="mt-5"
                      type="email"
                      value={signinEmail}
                      onChange={handleEmailChange}
                      placeholder="Enter Email"
                    />
                    <InputGroup className="mt-5">
                      <Input
                        value={password}
                        onChange={handlePasswordChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Box
                          className="relative left-4"
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Box>
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      mt={4}
                      variant="solid"
                      onClick={handleSignIn}
                      _hover={{ bgColor: "#271801", textColor: "white" }}
                    >
                      Sign In
                    </Button>
                    <Link
                      className="block float-right mt-5 font-bold"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </FormControl>
                </TabPanel>
                <TabPanel style={{ overflowY: "auto", maxHeight: "300px" }}>
                  <Box display={!showForm ? "block" : "none"}>
                    <NumberVerification
                      onPhoneNumberChange={handlePhoneNumberChange}
                      nullOtp={nullOtp}
                      setNullOtp={setNullOtp}
                    />
                  </Box>
                  <Box display={showForm ? "block" : "none"}>
                    <form onSubmit={handleSignUp}>
                      <FormControl isInvalid={errors.name}>
                        <Input
                          type="text"
                          name="name"
                          value={signUpFormData.name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                        />
                        <FormHelperText color="red">
                          {errors.name}
                        </FormHelperText>
                      </FormControl>

                      <FormControl mt={4} isInvalid={errors.email}>
                        <Input
                          type="email"
                          name="email"
                          value={signUpFormData.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                        />
                        <FormHelperText color="red">
                          {errors.email}
                        </FormHelperText>
                      </FormControl>
                      <FormControl mt={4}>
                        <Input
                          type="tel"
                          readOnly
                          name="phone"
                          value={signUpFormData.phone}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                        />
                        <FormHelperText color="red">
                          {errors.phone}
                        </FormHelperText>
                      </FormControl>

                      <FormControl mt={4} isInvalid={errors.password}>
                        <InputGroup>
                          <Input
                            type={showPasswordS ? "text" : "password"}
                            name="password"
                            value={signUpFormData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                          />
                          <FormHelperText color="red">
                            {errors.password}
                          </FormHelperText>
                          <InputRightElement width="4.5rem">
                            <Box
                              className="relative left-4"
                              h="1.75rem"
                              size="sm"
                              onClick={handleClickSignUp}
                            >
                              {showPasswordS ? <ViewIcon /> : <ViewOffIcon />}
                            </Box>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>

                      <FormControl className="mt-5">
                        <Input
                          type="text"
                          name="city"
                          value={signUpFormData.city}
                          onChange={handleChange}
                          placeholder="Enter City"
                        />
                      </FormControl>
                      <FormControl className="mt-5">
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                          name="gender"
                          value={signUpFormData.gender}
                          onChange={(value) =>
                            setsignUpFormData({
                              ...signUpFormData,
                              gender: value,
                            })
                          }
                        >
                          <Stack direction="row">
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                            <Radio value="Other">Other</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <FormControl className="mt-5">
                        <FormLabel>Religion</FormLabel>
                        <RadioGroup
                          name="religion"
                          value={signUpFormData.religion}
                          onChange={(value) =>
                            setsignUpFormData({
                              ...signUpFormData,
                              religion: value,
                            })
                          }
                        >
                          <Stack direction="column">
                            <Radio value="hindu">Hindu</Radio>
                            <Radio value="muslim">Muslim</Radio>
                            <Radio value="sikh">Sikh</Radio>
                            <Radio value="christian">Christian</Radio>
                            <Radio value="other">Other</Radio>
                          </Stack>
                        </RadioGroup>
                        {signUpFormData.religion === "other" && (
                          <Input
                            type="text"
                            name="religion"
                            value={signUpFormData.religion}
                            onChange={(e) =>
                              setsignUpFormData({
                                ...signUpFormData,
                                religion: e.target.value,
                              })
                            }
                            placeholder="Enter Religion"
                            className="mt-2"
                          />
                        )}
                      </FormControl>
                      <FormControl className="mt-5">
                        <FormLabel>Date of Birth</FormLabel>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={signUpFormData.dateOfBirth}
                          onChange={handleChange}
                        />
                      </FormControl>

                      <Button
                        mt={4}
                        _hover={{ bgColor: "#271801", textColor: "white" }}
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </form>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
        <Image src={logo} height={150} />
        <Box className="relative bottom-9 flex flex-col justify-center items-center">
          <Link to="/terms-conditions">Terms & Conditions</Link>
        </Box>
      </Box>
    );
};

export default SignIn;
