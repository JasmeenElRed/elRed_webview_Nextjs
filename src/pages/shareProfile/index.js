import { useEffect } from "react";
import { baseURL, webviewURL } from "@/config";
import Head from "next/head";
import NotFound from "@/component/notFound";

function ShareProfile(props) {
  const { data, userCode } = props;

  useEffect(() => {
    window?.addEventListener('message', (event) => {
      if (event?.data?.message === 'openDialPad') {
        const { phoneNumber } = event?.data;
        window?.open(`tel:${phoneNumber}`, '_self');
      }
    });
  }, []);

  if (!userCode) {
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={data?.profileTitle ?? ""}
          key="title"
        />
        <meta
          property="og:description"
          content={data?.description ?? ""}
          key="description"
        />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? "/"}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}?userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  console.log('Dev URL')
  res.setHeader("Cache-Control", "no-store");
  // const headers = new Headers();
  // headers.append('Content-Type', 'application/json');
  // headers.append('Accept', "application/json");
  // headers.append('X-ElRed-Test', Math.random() > 0.5 ? 'elRed-57c191ca14f63283': 'elRed-6d41c61445eb8f56')

  // const requestOptions = {
  //   cache: "no-cache",
  //   method: 'POST',
  //   headers: headers
  // };
  
  const userCode = query.userCode ?? "";

  // const request = new Request(`${baseURL}noSessionPreviewCardScreenshot?userCode=${userCode}`, requestOptions);


  const response = await fetch(
    `${baseURL}noSessionPreviewCardScreenshot?userCode=${userCode}`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-ElRed-Test':  Math.random() > 0.5 ? 'elRed-57c191ca14f63283': 'elRed-6d41c61445eb8f56',
      },
    }
  );

  // const response = await fetch(request);

  // console.log("request header after ===========>",req, req.headers,  'request header after')
  // console.log("=============>" , response.headers, 'response header after')

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode: userCode }, // will be passed to the page component as props
  };
}
export default ShareProfile;
