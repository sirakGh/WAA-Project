import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux'
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
import { Field, Form, Formik } from 'formik'
import { signup } from '../../store/user'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import cogoToast from 'cogo-toast';
import api from '../../configuration/api';
import './signup.css';
import Header from '../front/Header/Header';
import * as Yup from 'yup';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Ecommerce
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { user } = useSelector(state => state.user)
    const history = useHistory();
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          fullname: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        password: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });


    return (


        <>
        <Header></Header>
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                
                   

                    <Formik
                        initialValues={{ username: '', password: '', fullname: ''}}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            let seller = false;
                            let buyer = false;
                            
                            if(values.picked === 'seller'){
                                seller = true;
                            }
                            if(values.picked === 'buyer'){
                                buyer = true;
                            }
                            
                            api.post("register", {username:values.username
                            ,password: values.password,
                            fullName: values.fullname,
                        seller: seller,
                    buyer:buyer}).then(function (response){
                        console.log(response.data);
                            cogoToast.success('You have successfully registerd!');
                                history.push("/")
                    })
                            console.log(values);
                            // dispatch(signup(values)).then(() => {
                            
                            // })
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                             <main className="auth">
                             <section>
                            <Form>

                            <div >
                        <label htmlFor='user'>Fullname</label>
                        {errors.fullname && touched.fullname ? (
                            <div>{errors.fullname}</div>
                        ) : null}
                                        <Field name="fullname">
                                            {({ field, form, meta }) => (
                                                <TextField
                                                    autoComplete="fname"
                                                    
                                                    required
                                                    autoFocus
                                                    {...field}
                                                    type="text"
                                                />
                                            )}
                                        </Field>
                                        </div>
                                <div >
                                <label htmlFor='username'>Username</label>
                                {errors.username && touched.username ? (
                            <div>{errors.username}</div>
                        ) : null}
                                        <Field name="username">
                                            {({ field, form, meta }) => (
                                                <TextField
                                                    autoComplete="username"
                                                    
                                                    required
                                                    autoFocus
                                                    {...field}
                                                    type="text"
                                                />
                                            )}
                                        </Field>
                                        </div>
                                        <div>
                                        <label htmlFor='password'>Password</label>
                                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                                        <Field name="password">
                                            {({ field, form, meta }) => (
                                                <TextField 
                                                    autoComplete="password"
                                                    hintText="Password"
                                                    floatingLabelText="Password"
                                                    type="password"
                                                    errorText="Password is required"
                                                    required
                                                    autoFocus
                                                    {...field}
                                                />
                                            )}
                                        </Field>
                                        </div>
                                <div ><label ></label>
                                    <label>
                                    <Field type="radio" name="picked" value="buyer" />
                                        Buyer
                                    </label>
                                    <label>
                                    <Field type="radio" name="picked" value="seller" />
                                        Seller
                                    </label>
                                    </div>
                                  
                                  
                                <Button
                                    type="submit"
                                    
                                >
                                    Sign Up
                                </Button> <br/>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                  
                            </Form>
                            </section>
                            </main>
                        )}
                    </Formik>
                

                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Fragment>
        </>
    )

}

export default Signup;


