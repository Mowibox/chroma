import docsearch from "@docsearch/js";

docsearch({
  container: "#docsearch",
  appId: "TKZVOZXZA2",
  indexName: "mowiboxio",
  apiKey: "eac0e4796e0867dbc1c51ab466a9bc1f",
  searchParameters: {
    // wrap your filter in its own array
    facetFilters: [
      [`lang:${window.siteLang}`]
    ],
  },

  insights: true,
});

const onClick = function () {
  document.getElementsByClassName("DocSearch-Button")[0].click();
};

document.getElementById("searchToggleMobile").onclick = onClick;
document.getElementById("searchToggleDesktop").onclick = onClick;
