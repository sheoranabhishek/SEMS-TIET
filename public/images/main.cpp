//
//  main.cpp
//  LE1
//
//  Created by Anmolika on 24/05/21.
//

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool compare(pair<int, int>p1,pair<int, int>p2){
    if(p1.second==p2.second){
        int r1 = p1.first/p1.second;
        int r2 = p2.first/p2.second;
        return r1<r2;
    }
    return p1.second<p2.second;
} //pair <marks,subparts>

int main(int argc, const char * argv[]) {
    int minmarks,s,questions,marks;
    cin>>minmarks>>s>>questions;
    for (int i=0; i<=s; i++) {
        cin>>marks;
    }
    vector<pair<int, int> >q;
    for (int i=0; i<questions; i++) {
        int x,y; //marks,subparts
        cin>>x>>y;
        q.push_back(make_pair(x, y));
    
    }
    sort(q.begin(), q.end(), compare);


    int count = 0;
    for (int i=0; i<=s; i++) {
    	count = 0;
    	marks = 0;
	        while( marks <= minmarks){
	            for(auto p:q){
	                marks += marks+ p.first;
	                count++;
	            }  
	        }
	        cout<<count<<endl;
    }
    return 0;
}
