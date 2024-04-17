import { useEffect } from "react";
import { baseURL, webviewURL } from "@/config";
import Head from "next/head";

import NotFound from "@/component/notFound";

function ShareCard(props) {
  const { data, userCode, networkCode } = props;

  useEffect(() => {
    window?.addEventListener('message', (event) => {
      if (event?.data?.message === 'openDialPad') {
        const { phoneNumber } = event?.data;
        console.log(phoneNumber, 'pppppppppp')
        window?.open(`tel:${phoneNumber}`, '_self');
      }
    });
  }, []);

  if (!userCode && !networkCode) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? ""}
          key="image"
        />
        <meta property="og:title" content={data?.cardTitle ?? ""} key="title" />
        <meta property="og:description" content={data?.description ?? ""} />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={userCode ? `${webviewURL}share-card?userCode=${userCode}` : 
          `${webviewURL}network-share-card?networkCode=${networkCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const userCode = query?.userCode ?? "";
  const networkCode = query?.networkCode ?? "";

  let url = `${baseURL}`;
  if (userCode) {
    url += `noSessionPreviewCardScreenshot?userCode=${userCode}`;
  }

  if (networkCode) {
      url += `webviewGetNetworkScreenshot?networkCode=${networkCode}`;
  }

  const response = await fetch(url,
    {
      cache: "no-cache",
      method: userCode ? "POST" : "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-ElRed-Test':  Math.random() > 0.5 ? 'elRed-57c191ca14f63283': 'elRed-6d41c61445eb8f56',
      },
    }
  );

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result ?? {}, userCode: userCode , networkCode: networkCode  }, // will be passed to the page component as props
  };
}
export default ShareCard;
