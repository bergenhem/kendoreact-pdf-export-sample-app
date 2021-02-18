import './App.css';
import '@progress/kendo-theme-material/dist/all.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExportExample from './components/ExportExample';
import LayoutSample from './components/LayoutSample';
import GridExport from './components/GridExport';
import TreeListExport from './components/TreeListExport';

function App() {
  return (
    <Router>
      <Route exact path="/" component={ExportExample} />
      <Route path='/LayoutSample' component={LayoutSample} />
      <Route path='/GridExport' component={GridExport} />
      <Route path='/TreeListExport' component={TreeListExport} />
    </Router>
  );
}

export default App;
