# clocks

Clocks, symbols and number systems - using clocks to explain binary arithmetic


When we look at a number like 5923 we understand that each position represents a power of 10. We think in base 10. 
Five thousand, nine hundred and twenty three is understood to mean 3 + (2x10) + (9x102) + (5x103).  
Each digit is multiplied by the base to the power of n where n is the postion of the digit in the number 
reading from right to left.
Consider the number 26. Using our standard base 10 numbering system, we write this as 26 because 
there are 2 groups of 10 symbols and 6 more symbols : 2x10 + 6. You can write this number using any base.
By the way, in order to make this work, mathematics presumes that any number to the power of 0 is equal to 1:

26 =	-	-	-	(2 x 10)	+ (6 x 1)	 26	base 10
26 =	-	-	-	(2 x 9)	+ (8 x 1)	 28	base 9
26 =	-	-	-	(3 x 8)	+ (2 x 1)	 22	base 8
26 =	-	-	-	(3 x 7)	+ (5 x 1)	 35	base 7
26 =	-	-	-	(4 x 6)	+ (2 x 1)	 42	base 6
26 =	-	-	(1 x 25)	+ (0 x 5)	+ (1 x 1)	 101	base 5
26 =	-	-	(1 x 16)	+ (2 x 4)	+ (2 x 1)	 122	base 4
26 =	-	(0 x 27)	+ (2 x 9)	+ (2 x 3)	+ (2 x 1)	 0222	base 3
26 =	(1 x 16)	+ (1 x 8)	+ (0 x 4)	+ (1 x 2)	+ (1 x 0)	 11010	base 2

This serverless app uses clocks to demonstrate this graphically.
