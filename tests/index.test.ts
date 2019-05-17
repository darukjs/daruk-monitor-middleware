import { expect } from 'chai';
import myClass from '../src/index';

describe('test for myClass', () => {
  it('test for get method', (done) => {
    let foo = new myClass({
      a: 1
    });
    expect(foo.get('a')).to.equal(1);
    done();
  });
  it('test for get method', (done) => {
    let bar = new myClass({
      a: 1
    });
    expect(bar.get('a')).to.equal(1);
    expect(bar.set('a', 2)).to.equal(2);
    expect(bar.get('a')).to.equal(2);
    done();
  });
});
