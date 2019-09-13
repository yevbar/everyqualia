import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  '9T7X81TF88',
  '1868a347db4ea615566a328bf8bf5664'
);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeModal(item) {
  console.log("We got");
  console.log(item.target)
  console.log(item.target.closest("li"));
  const modal = document.getElementById("result-modal");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = item.target.closest("li").innerHTML;
  modal.style.display = "flex";

  await sleep(1);
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      window.keydown = null;
      window.onclick = null;
    }
  }
  window.onkeydown = function(event) {
    if (event.key === "Escape") {
      modal.style.display = "none";
      window.onkeydown = null;
      window.onclick = null;
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="search">
        <div id="result-modal" className="modal">
          <div id="modal-content">
          </div>
        </div>
        <InstantSearch indexName="reports" searchClient={searchClient}>
          <Configure hitsPerPage={8} />
          <div className="search-bar">
            <SearchBox  />
          </div>
          <div className="search-results">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div onClick={makeModal} className="hit-result">
      <div className="hit-title">
        <span><b>Title:</b></span> <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-substance">
        <span><b>Substance:</b></span> <Highlight attribute="substance" hit={props.hit} />
      </div>
      <div className="hit-report">
        <Highlight attribute="report" hit={props.hit} />
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
