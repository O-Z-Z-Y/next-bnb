import App, { AppContext, AppProps } from "next/app";
import axios from "../lib/api";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { Provider } from "react-redux";


const app = ({ Component, ...rest }: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Header />
      <Component {...props.pageProps} />
      <div id="root-modal" />
    </Provider>
  );
};

app.getInitialProps = wrapper.getInitialAppProps(store => async context => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  
  try {
    if (cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await meAPI();
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps };
});

export default app;