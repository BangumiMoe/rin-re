import "core-js/fn/string/starts-with";
import "core-js/fn/string/ends-with";
import "core-js/fn/object/entries";
import "core-js/fn/map";
import "core-js/fn/set";

import "dom4";
import "pepjs";
import URLSearchParams from "url-search-params";

if (!window.URLSearchParams) {
  window.URLSearchParams = URLSearchParams;
}
