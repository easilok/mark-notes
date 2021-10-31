export const downloadNote = (filename: string, text: string): void => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const importNote = (all_files: FileList, callback: (filename: string, e: ProgressEvent<FileReader>) => void): void => {
  // files that user has chosen
  if(all_files.length == 0) {
    return;
  }

  for (let i = 0; i < all_files.length; i++) {
    // first file selected by user
    const file = all_files[i];

    // files types allowed
    const allowed_types = [ 'text/plain' ];
    if(allowed_types.indexOf(file.type) == -1) {
      return;
    }

    // Max 2 MB allowed
    const max_size_allowed = 2*1024*1024
    if(file.size > max_size_allowed) {
      return;
    }

    // file validation is successfull
    // we will now read the file
    const reader = new FileReader();

    // file reading finished successfully
    reader.addEventListener('load', callback.bind(reader, file.name));

    // read as text file
    reader.readAsText(file);

  }
}
