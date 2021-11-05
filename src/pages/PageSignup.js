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
  Notification,
  Paragraph,
} from "grommet";
import { themeContextLogin } from "../theme";
import { useState } from "react";
import { requestSignup } from "../api/ManylogsApi";
import { Redirect } from "react-router";
import { StatusCriticalSmall } from "grommet-icons";

const PageSignup = () => {
  return (
    <Box direction="column">
      <PageHeader />
      <CompForm />
    </Box>
  );
};

const PageHeader = () => {
  return (
    <Box
      fill="horizontal"
      background="dark-0"
      align="center"
      justify="center"
      pad="small"
      height="80px"
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
  const [authenticated, setAuthenticated] = useState(undefined);
  const onFormSubmit = (name, email, password) => {
    // do nothing
  };
  return (
    <ThemeContext.Extend value={themeContextLogin}>
      <Box align="center" pad="large">
        <Box width="xmedium" round="xsmall" pad="40px">
          {authenticated && <Redirect to="/" />}
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
              onFormSubmit(nextValue.name, nextValue.email, nextValue.password)
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

            <FormField
              label="Create a password *"
              name="password"
              required
              validate={[
                (password) => {
                  if (password && password.length < 6)
                    return "6 or more chars required";
                  return undefined;
                },
              ]}
            >
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
              <Box
                margin={{ top: "medium" }}
                direction="column"
                align="center"
                gap="xsmall"
              >
                <Box direction="row" fill="horizontal" gap="small">
                  <StatusCriticalSmall color="orange" />
                  <Text>Signups are invite only at the moment.</Text>
                </Box>
                <Text>Contact info@manylogs.com to request an invite.</Text>
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    </ThemeContext.Extend>
  );
};

export default PageSignup;
