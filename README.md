# d-if (diff)

D-if is an neutral suite to test API compatibility over changes. Using multiples sddress of runing instances or stored snapshots, the results fields are compared to get the differences, ignoring values.

# How it works

The project could use two modes of operation: compare from previous snapshots or get the differences between two running servers.

Using a list of desired endpoints to compare, the difference is based on name of returned fields, ignoring values to be more extensible. The format of endpoints list must be like:

```JSON
{
    "endpoints": [
        { "url": "localhost:8090/v1/user", "method": "GET" },
        { "url": "localhost:8090/v1/user", "method": "POST" }
    ]
}
```

## Similar projects

The [swagger-diff](https://github.com/zallek/swagger-diff) has similar functionalities and could be used if your API use swagger definition

The Twitter [diffy](https://github.com/twitter/diffy) project test your API over multiple instances as a request pipe. If you use JAVA this could be a good choice.

### Author
Karl Alexander
