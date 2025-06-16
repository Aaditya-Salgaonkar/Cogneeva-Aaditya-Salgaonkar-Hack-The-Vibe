import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useCreateProject } from '../lib/project';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

export default function NewProjectForm() {
  const { mutate: createProject, isLoading, isError, error } = useCreateProject();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    createProject(data);
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Create a new project
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="file alternate outline"
              iconPosition="left"
              placeholder="Name"
              name="name"
              ref={register}
              error={errors.name && { content: errors.name.message, pointing: 'below' }}
            />
            <Form.TextArea
              fluid
              placeholder="Description"
              name="description"
              ref={register}
              error={errors.description && { content: errors.description.message, pointing: 'below' }}
            />

            <Button color="teal" fluid size="large" disabled={isLoading}>
              Submit
            </Button>
          </Segment>
        </Form>
        {isError && <Message error header="Oops!" content={error.message} />}
      </Grid.Column>
    </Grid>
  );
}