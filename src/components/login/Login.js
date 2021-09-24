import React from 'react';
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { login } from '../../store/user'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useHistory } from 'react-router-dom'
import cogoToast from 'cogo-toast';
import './login.css';
import Header from '../front/Header/Header';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginComponent = () => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory();
    return ( <>
        <Header></Header>
        <Container component="main" maxWidth="xs">
            
            <CssBaseline />
            <div className={classes.paper}>
                
                <Typography component="h1" variant="h5">
                    Sign in
          </Typography>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values) => {
                        dispatch(login(values)).then(() => {
                            cogoToast.success('Login Successful!');
                            history.push("/")
                            window.location.reload(true);
                        }


                        ).catch(()=>{
                            cogoToast.error('Credentials are wrong')
                            console.log("error")
                        })
                    }}
                >

                    {/* <main className="auth">
      <section>
        <form ref={formData} onSubmit={loginHandler}>
          <div >
            <label htmlFor='user'>User</label>
            <input type='text' id='user' />
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main> */}
<main className="auth">
    <section>
                    <Form>
                    <div >
                        <label htmlFor='user'>User</label>
                                <Field name="username">
                                    {({ field, form, meta }) => (
                                        <TextField
                                            required
                                            autoFocus
                                            {...field}
                                            type="text"
                                        />
                                    )}
                                </Field>
                                </div>
                                <div >
                                    <label htmlFor='password'>Password</label>
                                <Field name="password">
                                    {({ field, form, meta }) => (
                                        <TextField
                                            autoComplete="password"
                                            required
                                            autoFocus
                                            {...field}
                                            type="password"
                                        />
                                    )}
                                </Field>
                                </div>
                            <Button type="submit">Login</Button>
                
                    </Form>
                    </section>
                    </main>
                </Formik>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        </>
    )


}

export default LoginComponent;