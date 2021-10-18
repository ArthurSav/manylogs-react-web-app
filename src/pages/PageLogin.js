import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
  Main,
  Heading,
  ThemeContext,
  Anchor,
} from "grommet";
import { useState } from "react";
import { requestSignin } from "../api/ManylogsApi";
import { Redirect } from "react-router-dom";
import { themeContextLogin } from "../theme";
import { Logo1 } from "../components/Logo";

const PageLogin = () => {
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
    <ThemeContext.Extend value={themeContextLogin}>
      <Main align="center" pad={{ vertical: "100px", horizontal: "large" }}>
        <Box
          width="xmedium"
          background={{ color: "background-contrast" }}
          round="xsmall"
          pad="40px"
        >
          {authenticated && <Redirect to="/" />}
          <Box align="center" pad={{ bottom: "small" }}>
            <Logo1 />
            <Heading size="small" level={3}>
              Log in to Manylogs
            </Heading>
          </Box>
          <Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onSubmit={({ value: nextValue }) =>
              onFormSubmit(nextValue.email, nextValue.password)
            }
          >
            <FormField label="Email" name="email" required>
              <TextInput name="email" type="email" plain />
            </FormField>

            <FormField label="Password" name="password" required>
              <TextInput name="password" type="password" plain />
            </FormField>

            {error && (
              <Box pad={{ horizontal: "small" }}>
                <Text color="status-error">{error}</Text>
              </Box>
            )}

            <Box direction="row" justify="center" margin={{ top: "large" }}>
              <Button type="submit" label="Login" fill primary />
            </Box>
          </Form>
          <Box align="center" margin={{ top: "large" }}>
            <Text color="text-weak" size="small">
              Don't have an account?
              <Anchor href="/signup"> Sign up</Anchor>
            </Text>
          </Box>
        </Box>
      </Main>
    </ThemeContext.Extend>
  );
};

export default PageLogin;
