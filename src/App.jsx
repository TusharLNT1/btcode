import React, { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import './App.css';
import TextArea from './components/TextArea';

function App() {

  const [runtimes, setRuntimes] = useState([]); // Available Runtimes
  const [lang, setLang] = useState(null); // Language
  const [selectedRuntime, setSelectedRuntime] = useState(69); // Selected Runtime
  const [code, setCode] = useState(''); // Input Code
  const [input, setInput] = useState(''); // Input
  const [output, setOutput] = useState(''); // Output
  const [multiInputs, setMultiInputs] = useState(false); // Multi Input -> Bool
  const [multipleInputs, selectMultipleInputs] = useState([]); // Multiple Inputs

  // Get Runtimes
  useEffect(() => {
    const localRuntimes = localStorage.getItem('langRuntimes');
    if (localRuntimes) {
      setRuntimes(JSON.parse(localRuntimes));
    } else {
      fetch('https://emkc.org/api/v2/piston/runtimes')
        .then(res => res.json())
        .then(data => {
          setRuntimes(data);
          localStorage.setItem('langRuntimes', JSON.stringify(data));
        });
    }
  }, []);

  const runCode = () => {
    if (code) {
      // console.log(runtimes[selectedRuntime])
      setOutput('Executing code...');
      fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        body: JSON.stringify({
          ...runtimes[selectedRuntime],
          stdin: input,
          files: [{ content: code }]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setOutput(data.run.output);
        });
    } else {
      alert('Please enter some code to run it.')
    }
  }

  const submitListener = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      runCode();
    }
  }

  return (
    <div className='app'>
      <div className='main'>
        <a href='/' className='heading-top'>
          <img className='heading-logo' src={logo} />
          <h1 className='heading-text'> Online Compiler</h1>
        </a>
        <p className='heading-desc'>Run your code .....</p>
        <div className='main-content'>
          <div className='main-content-left'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 className='main-content-left-heading'>Write your code here</h2>
              <select style={{ height: '50px', marginTop: '20px', fontSize: '18px' }} className='main-content-left-select' onChange={(e) => {
                setLang(e.target.selectedIndex);
                console.log(e.target.selectedIndex)
                setSelectedRuntime(e.target.selectedIndex);
                console.log(e.target.selectedIndex, runtimes[e.target.selectedIndex]);
              }} value={runtimes[selectedRuntime]?.language}>
                {
                  runtimes.map(runtime => <option key={runtime.language + runtime.version} value={runtime.language}>{runtime.language + '(' + runtime.version + ')'}</option>)
                }
              </select>
            </div>
            <div className='main-content-left-editor'>
              <TextArea listener={submitListener} styles={{ width: '500px', height: '400px', fontSize: '25px' }} className='main-content-left-editor-textarea' placeholder='Write your code here...' onChange={(e) => setCode(e.target.value)} value={code} />
            </div>
          </div>
          <div className='main-content-right'>
            <h2 className='main-content-right-heading'>Input</h2>
            <div className='main-content-right-input'>
              <TextArea listener={submitListener} styles={{ width: '250px', height: '150px', fontSize: '20px' }} className='main-content-right-input-textarea' placeholder='Enter your Input Here...' onChange={(e) => setInput(e.target.value)} value={input} />
            </div>
            <h2 className='main-content-right-heading'>Ouput</h2>
            <div className='main-content-right-output'>
              <TextArea className='main-content-right-output-textarea' styles={{ width: '250px', height: '150px', fontSize: '20px' }} placeholder='Output will be displayed here...' readOnly={true} value={output} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='main-content-below-submit' onClick={runCode}>Run</button>
        </div>
      </div>
      <div style={{ textAlign: 'center' }} className='footer'>
        <p className='footer-text'>Made with 👨‍💻 by <a href='https://github.com/Tushar-CYL' target='_blank'>Tushar</a>
        </p>
      </div>
    </div>
  )
}

export default App
