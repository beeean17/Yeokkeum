```cpp
#include<vector>
usingnamespace std;
intsequencialSearch(vector<int>& arr, int target, int& cnt){
    cnt = 0;
for(int i = 0; i < arr.size(); i++){
        cnt++;
```
인덱스 반환
```
if(arr[i] == target) return i;  //
    }
```
못 찾으면반환
```
return-1;  //  -1
}
intbinarySearch(vector<int>& arr, int target, int& cnt){
int low = 0;
int high = arr.size() - 1;
    cnt = 0;
while (low <= high) {
        cnt++;
int mid = low + (high - low) / 2;
if (arr[mid] == target) {
```
찾은 경우 인덱스 반환
```
return mid;  //
        }
elseif (arr[mid] < target) {
```
오른쪽 반 탐색
```
            low = mid + 1;  //
        }
else {
```
왼쪽 반 탐색
```
        high = mid - 1;  //
    }
}
```
찾지 못한 경우반환
```cpp
return-1;  //  -1
}
intmain()
{
int N, x;
    cin >> N >> x;
    vector<int> A;
```
길이 의 오름차순 배열
```cpp
// NA
for(int i = 0; i < N; i++) {
        A.push_back(i);
    }
int cntSq, cntBn;
int seqResult = sequencialSearch(A, x, cntSq);
int binResult = binarySearch(A, x, cntBn);
    cout << seqResult << " " << cntSq << endl;
    cout << binResult << " " << cntBn << endl;
return0;
}
```
번 과제 동전 찾기

---

```cpp
#include<vector>
usingnamespace std;
```
번부터 차례로 한 개씩 검사
```
// 0
intCount_A(vector<int>& arr, int f){
return f + 1;
}
```
두 개씩 저울로 서로 비교
```
//
intCount_B(int f, int N){
return f / 2 + 1;
}
```
절반으로 나누어 비교
```
//
intCount_C(int f, int N){
int cnt = 0;
int size = N;
int pos = f;
while (size > 1) {
        cnt++;
if (size % 2 == 1) {
```
홀수개마지막 하나를 제외하고 나머지를 절반으로 나눔
```
// :
if (pos == size - 1) {
```
제외된 동전이 가짜
```
//
break;
            }
```
나머지개를 절반으로 나눔
```
//  (size-1)
int half = (size - 1) / 2;
if (pos < half) {
```
왼쪽 절반에 있음
```
//
                size = half;
            } else {
```
오른쪽 절반에 있음
```
//
                size = half;
                pos = pos - half;
            }
        } else {
```
짝수개절반으로 나눔
```
// :
int half = size / 2;
if (pos < half) {
```
왼쪽 절반에 있음
```
//
                size = half;
            } else {
```
오른쪽 절반에 있음
```cpp
//
                size = half;
                pos = pos - half;
            }
        }
    }
}
intmain()
{
int N, f;
    cin >> N >> f;
vector<int> arr(N, 0);
    arr[f] = 1;
    cout << Count_A(arr, f) << endl;
    cout << Count_B(f, N) << endl;
    cout << Count_C(f, N) << endl;
return0;
}
```