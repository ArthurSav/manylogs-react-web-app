import { Box, Form, FormField, TextInput, Button, Text, Main } from "grommet";
import { useState } from "react";
import { requestSignin } from "../api/ManylogsApi";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(undefined);

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
    <Main align="center" justify="center">
      <Box
        width="medium"
        background={{ color: "active-background" }}
        round="xsmall"
        pad="large"
      >
        {authenticated && <Redirect to="/apps" />}
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
    </Main>
  );
};

export default Signin;
