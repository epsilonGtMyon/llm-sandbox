# webapp01


## ライブラリの追加

```
pip install "fastapi[all]"
pip install langchain langchain-google-genai langchain_community
```

## 起動

```
uvicorn main:app --reload --log-config log_config.yaml
```

.env あり

```
uvicorn main:app --reload --log-config log_config.yaml --env-file .env
```

## .env

`.env` には 以下のような値を設定

| 名称           | 値             |
|---------------|----------------|
|GOOGLE_API_KEY | Google APIのキー|

