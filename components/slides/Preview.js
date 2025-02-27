import React, { useState, useEffect } from "react";
import { finaldata } from "./Extras";
import ButtonWithSVG from "../elements/buttons/ButtonWithSVG";
import { db } from "../../config/firebase";
import { username } from "./HomePage";
import ToastSuccess from "../elements/toaster/ToastSuccess";
import ShareUs from "../ShareUs";

export default function Preview() {
  const [copiedAlertVisible, setCopiedAlertVisible] = useState(false);
  const [downloadAlertVisible, setDownloadAlertVisible] = useState(false);
  var md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: "“”‘’",
    highlight: function (/*str, lang*/) {
      return "";
    },
  });

  useEffect(() => {
    db.collection(username).add({ date: Date(), data: finaldata });
    setTimeout(() => {
      document.getElementById("content").innerHTML = md.render(finaldata);
    }, 300);
  }, []);

  function onCopy() {
    navigator.clipboard.writeText(finaldata);
    // Alert for Copied
    copied();
  }
  function onDownload() {
    const element = document.createElement("a");
    const file = new Blob([finaldata], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "ReadMe.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    // Alert for Downloaded
    downloaded();
  }
  function reloadTab() {
    location.reload();
  }
  function copied() {
    if (copiedAlertVisible !== true) {
      setCopiedAlertVisible(true);
      setTimeout(() => {
        setCopiedAlertVisible(false);
      }, 3000);
    }
  }
  function downloaded() {
    if (downloadAlertVisible !== true) {
      setDownloadAlertVisible(true);
      setTimeout(() => {
        setDownloadAlertVisible(false);
      }, 3000);
    }
  }
  return (
    <div className="w-full flex flex-col items-center">
      <p className="w-full text-center text-3xl my-8">
        Your Awesome Profile is ready !
      </p>
      <div className="flex flex-col md:flex-row mb-10">
        <ButtonWithSVG
          title="Copy Code"
          onClick={() => onCopy()}
          d={
            "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          }
        />
        <ButtonWithSVG
          title="Download Markdown File"
          onClick={() => onDownload()}
          d={
            "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          }
        />
        <ButtonWithSVG
          title="Create New"
          onClick={() => reloadTab()}
          d={
            "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          }
        />
      </div>
      <div className="flex">
        <p className="bg-green-200 text-zinc-800 p-1 px-4 rounded-t-md brightness-75">
          PREVIEW
        </p>
      </div>
      <div
        id="content"
        className="w-full md:w-8/12 p-3 py-6 bg-zinc-800 rounded-lg ring-1 ring-green-200 shadow-xl shadow-green-200/20 text-zinc-100"
      ></div>
      <ShareUs />
      {copiedAlertVisible && <ToastSuccess title="Copied Successfully !" />}
      {downloadAlertVisible && <ToastSuccess title="Download Started !" />}
    </div>
  );
}
