import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { BACKEND_ENDPOINT } from "../constants";

const NumberVerification = ({ onPhoneNumberChange, nullOtp, setNullOtp }) => {
  const toast = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [formState, setFormState] = useState({
    showOtpInput: false,
    resendDisabled: false,
    phoneNumberError: "",
    phoneReadOnly: false,
  });

  useEffect(() => {
    if (nullOtp) {
      setOtp("");
      setNullOtp(false);
      editPhoneNumber()
    }
  }, [nullOtp]);

  const isValidPhoneNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const handleChange = (index, value) => {
    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtp);
  };

  const editPhoneNumber = () => {
    setFormState({ ...formState, phoneReadOnly: false, showOtpInput: false });
  };


  const generateOtp = async () => {
    try {
      if (!isValidPhoneNumber(phoneNumber)) {
        setFormState({
          ...formState,
          phoneNumberError: "Phone number must be exactly 10 digits",
        });
        return;
      }
      const response = await axios.post(`${BACKEND_ENDPOINT}generateOTP`, {
        phone: phoneNumber,
      });
      if (response.status === 200) {
        toast({
          title: "OTP Sent",
          description: `An OTP has been sent to ${phoneNumber}`,
          status: "info",
          variant: "subtle",
          duration: 9000,
          position: "bottom-right",
          isClosable: false,
        });
        setFormState({
          ...formState,
          showOtpInput: true,
          resendDisabled: true,
          phoneNumberError: "",
          phoneReadOnly: true,
        });
        setTimeout(
          () => setFormState({ ...formState, resendDisabled: false }),
          180000
        );
      } else {
        toast({
          title: "Error",
          description: `Please Try Again`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${BACKEND_ENDPOINT}verifyOTP`, {
        code: otp,
      });
      if (response.status === 200) {
        onPhoneNumberChange(phoneNumber);
        toast({
          title: "Phone Nubmer Added",
          description: `Your phone number ${phoneNumber} has been succesfully verified`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box id="numberverification">
      <FormControl isInvalid={formState.phoneNumberError}>
        <Input
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          readOnly={formState.phoneReadOnly}
        />
        <FormErrorMessage>{formState.phoneNumberError}</FormErrorMessage>
      </FormControl>
      {!formState.showOtpInput && (
        <Button
          mt={4}
          variant="solid"
          onClick={generateOtp}
          disabled={!isValidPhoneNumber(phoneNumber)}
          _hover={{ bgColor: "#271801", textColor: "white" }}
        >
          Send OTP
        </Button>
      )}
      {formState.showOtpInput && (
        <>
          <FormControl className="mt-4">
            <PinInput value={otp} onChange={(value) => setOtp(value)}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <PinInputField
                  marginRight={index < 5 ? "1.5" : "0"}
                  marginLeft={index === 0 ? "1.5" : "0"}
                  key={index}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </PinInput>
          </FormControl>
          <Box className="flex justify-evenly">
            <Button
              mt={4}
              variant="solid"
              onClick={verifyOtp}
              _hover={{ bgColor: "#271801", textColor: "white" }}
            >
              Submit OTP
            </Button>
            <Button
              mt={4}
              variant="solid"
              disabled={formState.resendDisabled}
              onClick={generateOtp}
              _hover={{ bgColor: "#271801", textColor: "white" }}
            >
              Resend OTP
            </Button>
          </Box>
          <Box className="flex justify-center">
            <Button
              mt={4}
              variant="solid"
              disabled={formState.resendDisabled}
              onClick={editPhoneNumber}
              _hover={{ bgColor: "#271801", textColor: "white" }}
            >
              Edit Phone Number
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default NumberVerification;
