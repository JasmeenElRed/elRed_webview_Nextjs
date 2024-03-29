import Head from "next/head";

function DeleteUSerAccount() {
  return (
    <>
     <Head>
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />

        <meta property="og:title" content={"Elred Delete Account"} key="title" />
        <meta property="og:description" content={"Elred Webview Delete Account"} />
      </Head>

      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src="https://el-red-deleteuseraccount-dev.vercel.app/"
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export default DeleteUSerAccount;