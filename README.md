## Use CKEditor without eject

### yarn add customize-cra react-app-rewired 

### package.json 수정  

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  }
```

### config-overrides.js 파일 추가 후 내용 작성