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
  Image,
} from "grommet";
import { themeContextLogin } from "../theme";
import { useState } from "react";

const PageSignup = () => {
  return (
    <Main>
      <PageHeader />
      <CompForm />
    </Main>
  );
};

const PageHeader = () => {
  return (
    <Box
      fill="horizontal"
      background="dark-0"
      align="center"
      pad="small"
      // border={{ size: "xsmall", side: "bottom" }}
    >
      <Box width="150px">
        <Image src="/assets/ml_full_logo_color_bg_dark_small.svg" />
      </Box>
    </Box>
  );
};

const CompForm = () => {
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const onFormSubmit = (email, password) => {};
  return (
    <ThemeContext.Extend value={themeContextLogin}>
      <Box align="center" pad="large">
        <Box width="xmedium" round="xsmall" pad="40px">
          <Box align="center" pad={{ bottom: "medium" }}>
            <Heading size="small" level={2} margin="small">
              Create your Free Account
            </Heading>
            <Text color="text-weak" size="16px">
              Already have a Manylogs account?
              <Anchor href="/login"> Log in</Anchor>
            </Text>
          </Box>
          <Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onSubmit={({ value: nextValue }) =>
              onFormSubmit(nextValue.email, nextValue.password)
            }
          >
            <FormField label="Name *" name="name" required>
              <TextInput
                name="name"
                type="text"
                placeholder="Your full name"
                plain
              />
            </FormField>

            <FormField label="Work email *" name="email" required>
              <TextInput
                name="email"
                type="email"
                placeholder="you@company.com"
                plain
              />
            </FormField>

            <FormField label="Create a password *" name="password" required>
              <TextInput
                name="password"
                type="password"
                placeholder="Enter a strong password"
                plain
              />
            </FormField>

            <Box
              direction="column"
              justify="center"
              align="center"
              gap="small"
              margin={{ top: "large" }}
            >
              <Button type="submit" label="Sign up" fill primary />
              {error && <Text color="status-error">{error}</Text>}
            </Box>
          </Form>
        </Box>
      </Box>
    </ThemeContext.Extend>
  );
};

export default PageSignup;
