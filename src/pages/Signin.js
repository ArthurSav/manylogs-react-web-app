import {
  Box,
  Form,
  FormField,
  TextInput,
  MaskedInput,
  Button,
  Text,
} from "grommet";
import { useState } from "react";
import { requestSignin } from "../api/ManylogsApi";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const onFormSubmit = (email, password) => {
    requestSignin(
      email,
      password,
      () => {
        setAuthenticated(true);
      },
      (e) => {
        setError(e);
      }
    );
  };

  return (
    <Box
      width="medium"
      background={{ color: "active-background" }}
      round="small"
      pad="large"
    >
      {authenticated ? <Redirect to="/apps" /> : null}
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onSubmit={({ value: nextValue }) =>
          onFormSubmit(nextValue.email, nextValue.password)
        }
      >
        <FormField label="Email" name="email" required>
          <TextInput name="email" type="email" />
        </FormField>

        <FormField label="Password" name="password" required>
          <TextInput name="password" type="password" />
        </FormField>

        {error && (
          <Box pad={{ horizontal: "small" }}>
            <Text color="status-error">{error}</Text>
          </Box>
        )}

        <Box direction="row" justify="center" margin={{ top: "large" }}>
          <Button type="submit" label="Login" primary />
        </Box>
      </Form>
    </Box>
  );
};

export default Signin;
