import { useState } from "react";
import axios from "axios";
import "../App.css";
import PreviewPage from "./PreviewPage";

export interface IQuestion {
    title: string,
    questionLink: string    
}

const Homepage = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [questionList, setQuestionList] = useState<IQuestion[] | null>(null);
    const [fileName, setFileName] = useState("No file chosen");
    // const [isVisible, setVisible] = useState(false);
    const handleFileUpload = async (event: React.FormEvent) => {
        event.preventDefault();

    if (!uploadedFile) {
        setQuestionList([]);
        return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
        const response = await axios.post("http://localhost:3000/api/v1/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // const response = await axios.get('http://localhost:4000/upload')
        console.log(response?.data?.data);
        setQuestionList(response?.data?.data);
        // setVisible(true);
    } catch (error) {
        console.log(error);
    }};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setUploadedFile(file);
        setFileName(file ? file.name: "No File chosen");
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>Upload questions</h1>
            </header>
            <main>
                <form onSubmit={handleFileUpload}>
                <label className="custom-file-upload">
                    <input
                    type="file"
                    accept='.csv'
                    onChange={(event) => handleChange(event)}
                    />
                    Choose File
                </label>
                <span className="file-name">{fileName}</span>
                <div>
                    <button type="submit">Upload</button>
                </div>
                </form>
                {questionList && <PreviewPage questionList = {questionList} setQuestionList = {setQuestionList}/>}
        </main>
        </div>
    );
};

export default Homepage;
