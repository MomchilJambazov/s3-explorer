import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '@/pages/dashboard'
import Header from '@/components/layout/Header';
import CredentialsForm from '@/components/form/CredentialsForm';
import NotFound from '@/pages/not-found';
import { TreeProvider } from '@/contexts/TreeContext'
import { CredentialsProvider } from '@/contexts/CredentialsContext'

function App() {
  return (
    <CredentialsProvider>
      <TreeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/credentials" element={<CredentialsForm />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </TreeProvider>
    </CredentialsProvider>
  );
}

export default App;
