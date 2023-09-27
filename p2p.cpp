#include <bits/stdc++.h>
using namespace std;

char st[100];
int top=-1;

void push(char st[], char value){
   top++;
   st[top]=value;
}
char pop(char st[]){
	char res= st[top];
	top--;
	return res;
}

int prior(char ch){
    if(ch=='(') return 0;
    else if(ch=='-' || ch=='+') return 1;
    else if(ch=='/' || ch=='*') return 2;
}
bool isAlun(char ch){
    if((int)ch>=48 and (int)ch<57){
        return true;
    }
    else {
        return false;
    }
}

int main(){
    cout<<"enter your Infix expression ::";
    char ch[30];
    for(int p=0;p<100;p++){
        char a;
        cin>>a;
        ch[p]=a;
        if(ch[p]=='#') break;
        else{
            if(isalnum(ch[p])){
                cout<<ch[p]<<" ";
            }
            else if(ch[p]=='('){
                push(st,ch[p]);
            }
            else if(ch[p]==')'){
                while(pop(st)!='('){
                    cout<<st[top]<<" ";
                }
            }
            else{
                while(prior(st[top])>=prior(ch[p])){
                    cout<<pop(st)<<" ";
                }
                push(st,ch[p]);
            }
        }
        while(top!=-1){
            cout<<pop(st)<<" ";
        }
    }

    
    return 0;
}